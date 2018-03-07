import { Form } from 'antd';

const FormItem = Form.Item;

export default ({ decorator, children }) => (
  <FormItem>
    {decorator(children)}
  </FormItem>
);
