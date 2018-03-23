import { Icon, Button } from 'antd';
import { Form, FormField, FormItem, Input } from './form';

export default Form.create()(({ form, onSubmit }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };

  const { getFieldDecorator } = form;
  const usernameDecorator = getFieldDecorator('username', {
    rules: [{ required: true, message: 'Please input your username!' }],
  });
  const passwordDecorator = getFieldDecorator('password', {
    rules: [{ required: true, message: 'Please input your password!' }],
  });

  return (
    <Form onSubmit={handleSubmit}>
      <FormField decorator={usernameDecorator}>
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Username"
          autoComplete="off" />
      </FormField>
      <FormField decorator={passwordDecorator}>
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="Password"
          autoComplete="off" />
      </FormField>
      <FormItem>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Login
        </Button>
      </FormItem>
    </Form>
  );
});
