import { compose, lifecycle, branch, renderNothing } from 'recompose';
import Router from 'next/router';
import { isAuth, getUser } from './auth';

export default compose(
  lifecycle({
    componentDidMount() {
      if (isAuth()) {
        this.setState({ currnetUser: getUser() });
      } else {
        Router.replace('/login');
      }
    }
  }),
  branch(
    ({ currnetUser }) => !currnetUser,
    renderNothing
  )
);
