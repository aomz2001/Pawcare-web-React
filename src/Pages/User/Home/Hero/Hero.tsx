import { Button, Input, Space } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const { Search } = Input;
    const navigate = useNavigate();

    const onSearch: SearchProps['onSearch'] = async (value, _e) => {
        try {
          const response = await axios.post('http://localhost:3000/api/search-provider', {
            firstname: value,  
            lastname: value,   
          });
    
          const searchResults = response.data.data;
    
          if (searchResults.length > 0) {
            navigate('/search-provider-service', { state: { searchResults } });
          } else {
            console.log('No results found');
            alert('ไม่พบข้อมูลผู้ให้บริการ');
          }
        } catch (error) {
          console.error('Error searching for provider:', error);
          alert('ไม่พบข้อมูลผู้ให้บริการ');
        }
      };
    return (
        <>
            <section>
                <div className=" bg-[url('/src/assets/image/main.jpg')] h-[782px] bg-cover bg-no-repeat w-full " >
                    <div className="container">
                        <div className="flex flex-col pt-28 ">
                            <h3 className='text-white text-xl pl-24 sm:pl-40 max-[768px]:text-lg'>Dog & Cat Service</h3>
                            <h1 className='text-white text-7xl pl-10 max-[768px]:text-6xl sm:pl-20 p-7 '>PAWCARE</h1>
                            <h3 className='text-white text-xl pl-16 sm:pl-28 max-[768px]:text-lg '>Take Care Your “ True Friend ” </h3>
                            <div className=" max-w-sm flex flex-col gap-3 py-8 justify-center items-center ml-12">
                                <h3 className='text-white text-lg'>ค้นหาพี่เลี้ยงได้ที่นี่</h3>
                                <Space direction="vertical">
                                    <Search
                                        placeholder="Search Provider"
                                        onSearch={onSearch}
                                        enterButton = {<Button style={{ backgroundColor: '#815B5B', color: '#fff' }}>ค้นหา</Button>}
                                        size="large" 
                                        style={{ width: '100%' }}
                                    />
                                </Space>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='findmentor' className="h-[121px] bg-[#8A8178]"></div>
            </section>
        </>
    )
}

export default Hero