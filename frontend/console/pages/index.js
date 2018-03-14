import enhance from '../lib/enhance';

export default enhance()(({ currentUser }) => (
  <div>
    <h2>Hello {currentUser.username}, welcome on board</h2>
  </div>
));
