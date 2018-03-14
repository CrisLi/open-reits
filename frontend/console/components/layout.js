import { Spin } from 'antd';
import '../styles/index.less';

export default ({ children, loading }) => {
  console.log(loading);
  return (
    <Spin spinning={false}>
      {children}
    </Spin>
  );
};
