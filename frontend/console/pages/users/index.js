import { Card, message } from 'antd';
import { compose, lifecycle } from 'recompose';
import enhance from '../../lib/enhance';
import UserTable from '../../components/users/user-table';

const withUsers = lifecycle({
  async componentDidMount() {
    const users = await this.props.handleApi('getUsers');
    this.setState({
      users
    });
  },
  componentDidUpdate() {
    const { handleApiError } = this.props;
    handleApiError((error) => {
      if (error.message) {
        message.error(error.message);
      }
    });
  }
});

const Users = ({ users }) => (
  <Card>
    <UserTable users={users} />
  </Card>
);

export default compose(
  enhance(),
  withUsers
)(Users);
