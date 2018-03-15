import { Form } from 'antd';

const FormItem = Form.Item;

export default ({ decorator, children, ...restProps }) => (
  <FormItem {...restProps}>
    {decorator(children)}
  </FormItem>
);
