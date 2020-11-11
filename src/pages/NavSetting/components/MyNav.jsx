import React, { useState, useContext } from 'react';
import { List, Tag, Avatar } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import styles from './style.less';
import { tagListContext } from '../index';
// import TagItem from './TagItem';
import TagItem from './TagItem.jsx';

const MyNav = () => {
  const { tagList, setTagList } = useContext(tagListContext);

  const [dragging, setDragging] = useState(false); // 判断是否开始拖动
  const [draggingIndex, setDragIndex] = useState(-1); // 拖动元素的下标
  const [startPageY, setStartPageY] = useState(0); // 开始拖动元素的Y轴坐标
  const [offsetPageY, setOffsetPageY] = useState(0);
  const [newRender, setNewRender] = useState(false);
  // 重新排序
  const moveSort = (dragIndex, hoverIndex) => {
    let tagList1 = tagList;
    const tmp = tagList1[dragIndex];

    tagList1.splice(dragIndex, 1);
    tagList1.splice(hoverIndex, 0, tmp);
    setTagList(JSON.parse(JSON.stringify(tagList1)));
  };

  const newRenderFn = () => {
    setNewRender(!newRender);
  };
  const handleCancel = (index) => {
    let tagList1 = tagList;
    tagList1.splice(index, 1);
    setTagList(JSON.parse(JSON.stringify(tagList1)));
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.outsideContainer}>
        <h2>常用导航</h2>
        <p>
          <span>{tagList.length}</span>/15
        </p>
        <List
          className={styles.settingsList}
          dataSource={tagList}
          grid={{ column: 5, gutter: 16 }}
          renderItem={(item, index) => (
            <List.Item>
              <TagItem
                index={index}
                value={item.title}
                moveSort={moveSort}
                title={item.title}
                icon={item.icon}
                newRenderFn={newRenderFn}
                newRender={newRender}
                handleCancel={() => handleCancel(index)}
              />
            </List.Item>
          )}
        />
      </div>
    </DndProvider>
  );
};

export default MyNav;
