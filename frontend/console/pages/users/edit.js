import { compose, lifecycle } from 'recompose';
import enhance from '../../lib/enhance';

const withUser = lifecycle({
  async componentDidMount() {
    const { userId } = this.props.query;
    console.log(this.props.query);
    const user = await this.props.handleApi({ method: 'getUser', params: [userId] });
    this.setState({
      user
    });
  }
});

const UserEdit = ({ user }) => (
  <div>
    User New page {user.username}
  </div>
);

export default compose(
  enhance(),
  withUser
)(UserEdit);
