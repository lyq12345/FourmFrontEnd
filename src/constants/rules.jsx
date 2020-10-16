// eslint-disable-next-line max-len
export const getCommonRules = (
  {
    tip,
    require = false,
    length = false,
    symbol = false,
    number = false,
    letterNumber = false,
    phone = false,
    idCard = false,
  },
  func,
) => {
  const rules = func ? [func] : [];

  if (require) {
    rules.push({
      required: true,
      message: tip || '该输入框不能为空!',
    });
  }

  if (symbol) {
    rules.push({
      pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
      message: '请输入汉字、英文或者数字',
    });
  }

  if (letterNumber) {
    rules.push({
      pattern: /^[A-Za-z0-9]+$/,
      message: '请输入英文或者数字',
    });
  }

  if (number) {
    rules.push({
      pattern: /^[0-9]*$/,
      message: '只能输入数字',
    });
  }

  if (phone) {
    rules.push({
      pattern: /^1[3456789]\d{9}$/,
      message: '请输入正确的联系电话',
    });
  }

  if (idCard) {
    rules.push({
      pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      message: '请输入正确的身份证号',
    });
  }

  if (length) {
    rules.push({
      pattern: new RegExp(`^.{1,${length}}$`),
      message: `最大长度${length}个字!`,
    });
  }

  return rules;
};
