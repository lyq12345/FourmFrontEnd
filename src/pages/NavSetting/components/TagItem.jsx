import React, { useRef } from 'react';
import { Tag, Card, Avatar } from 'antd';
import { CloseOutlined, TrophyOutlined } from '@ant-design/icons';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import styles from './style.less';

let dragingIndex = '-1';
let opacity = '1';

// 被拖的Tag
const TagSource = {
  // 开始被拖拽时触发
  beginDrag(props) {
    dragingIndex = props.value;
    return {
      index: props.index,
    };
  },

  // 结束拖拽时触发
  endDrag(props) {
    dragingIndex = '-1';
    opacity = '1';
    props.newRenderFn();
  },
};

// 目标Tag
const TagTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return null;
    }
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

    const clientOffset = monitor.getClientOffset();
    const hoverClientX = clientOffset.x - hoverBoundingRect.left; // 悬浮时鼠标距离目标源的左边距

    if (hoverIndex - dragIndex === 1 && hoverClientX < hoverMiddleX) {
      return null;
    }
    if (dragIndex - hoverIndex === 1 && hoverClientX > hoverMiddleX) {
      return null;
    }

    props.moveSort(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  },
};

class TagItem extends React.Component {
  render() {
    const { connectDragSource, connectDropTarget, value } = this.props;
    opacity = value === dragingIndex ? '0.1' : '1';
    return connectDragSource(
      connectDropTarget(
        <div>
          <Card
            style={{ opacity: opacity, borderRadius: '8px', backgroundColor: '#F4F4F4' }}
            hoverable={true}
            size="small"
          >
            <div style={{ display: 'flex' }}>
              <Avatar size={26} icon={<img src={this.props.icon} />} />
              <span style={{ marginLeft: '10px' }}>{this.props.title}</span>
              <div style={{ flex: 1 }}></div>
              <div>
                <CloseOutlined onClick={this.props.handleCancel} />
              </div>
            </div>
          </Card>
        </div>,
      ),
    );
  }
}

export default DragSource('tag', TagSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(
  DropTarget('tag', TagTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }))(TagItem),
);
