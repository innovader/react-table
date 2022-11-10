import { useEffect, useState} from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Table from './components/Table';
import tableDataJSON from "./userListData.json";

function App() {
  const [userList, setUserList] = useState(tableDataJSON.data)

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  useEffect(() => {
      localStorage.setItem('theme', theme);
      document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
      if (theme === 'light') {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    };

  const filterdata = (searchValue) => {
    if (searchValue === "") {
      return tableDataJSON.data;
    }
    return tableDataJSON.data.filter(
      (userData) => userData.firstName.toLowerCase().includes(searchValue.toLowerCase())
      || userData.lastName.toLowerCase().includes(searchValue.toLowerCase())
      || userData.email.toLowerCase().includes(searchValue.toLowerCase())
    )
  }
  
  const [searchValue, setSearchValue] = useState('')
  useEffect(() => {
    const filteredData = filterdata(searchValue)
    setUserList(filteredData)
  }, [searchValue])

  return (
      <div className={`App ${theme}`}>
          <button onClick={toggleTheme}>Toggle Theme</button>
          <SearchBar callback={(searchValue) => setSearchValue(searchValue)}/>
          <Table dataList={userList}/>
      </div>
  );
}

export default App;