import { Input } from 'antd';

type Props = {
  onSearch: (search: string) => void;
  loading: boolean;
};

const InputUrl = (props: Props) => {
  return (
    <Input.Search
      placeholder='Type full web address to scraping article.'
      allowClear
      enterButton='Scaping!'
      size='large'
      onSearch={props.onSearch}
      loading={props.loading}
    />
  );
};

export default InputUrl;
