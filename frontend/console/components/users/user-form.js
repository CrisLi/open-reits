import { Button, Divider } from 'antd';
import { omit } from 'lodash';
import { Form, FormField, FormItem, Input, Select } from '../form';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const formTailLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 8, offset: 6 },
};

export default Form.create()(({ form, onSubmit, onCancel }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        onSubmit({ ...omit(values, 'provider'), org: values.provider });
      }
    });
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  const { getFieldDecorator } = form;
  const orgDecorator = getFieldDecorator('provider', {
    rules: [{ required: true, min: 3 }],
  });
  const usernameDecorator = getFieldDecorator('username', {
    rules: [{ required: true, min: 3 }],
  });
  const passwordDecorator = getFieldDecorator('password', {
    rules: [{ required: true, min: 8 }],
  });
  const confirmPasswordDecorator = getFieldDecorator('confirmPassword', {
    rules: [{ required: true }, { validator: compareToFirstPassword }],
  });
  const rolesDecorator = getFieldDecorator('roles', {
    rules: [{ required: true }],
  });

  return (
    <Form onSubmit={handleSubmit}>
      <FormField decorator={orgDecorator} label="Provider" {...formItemLayout}>
        <Input placeholder="Provdier" />
      </FormField>
      <FormField decorator={usernameDecorator} label="Username" {...formItemLayout}>
        <Input placeholder="Username" />
      </FormField>
      <FormField decorator={passwordDecorator} label="Password" {...formItemLayout}>
        <Input type="password" placeholder="Password" />
      </FormField>
      <FormField decorator={confirmPasswordDecorator} label="Confirm Password" {...formItemLayout}>
        <Input type="password" placeholder="Confirm Password" />
      </FormField>
      <FormField decorator={rolesDecorator} label="Roles" {...formItemLayout}>
        <Select mode="multiple" placeholder="Please select roles">
          <Option value="FA">FA</Option>
          <Option value="FINACE">Finace</Option>
          <Option value="PM">PM</Option>
        </Select>
      </FormField>
      <FormItem {...formTailLayout}>
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Divider type="vertical" />
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </FormItem>
    </Form>
  );
});
