import { Button } from 'antd';
import enhance from '../../lib/enhance';

export default enhance()(({ setLoading }) => {
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <div>
      User Pages
      <Button onClick={handleClick}>load</Button>
    </div>
  );
});
