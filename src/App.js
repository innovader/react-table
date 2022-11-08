import {useCallback, useEffect, useMemo, useState} from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
// import {ApiClient} from "./ApiClient";
import Table from './components/Table';
import tableDataJSON from "./tableData.json";

function App() {
  const [data, setData] = useState(tableDataJSON.data)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [searchValue, setSearchValue] = useState('')

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
    return data.filter(
      (userData) => userData.firstName.toLowerCase().includes(searchValue.toLowerCase())
      || userData.lastName.toLowerCase().includes(searchValue.toLowerCase())
      || userData.email.toLowerCase().includes(searchValue.toLowerCase())
    )
  }
  // const apiClient = useMemo(() => new ApiClient(), [])

  // const fetchData = useCallback(async () => {
  //     // do smth with data
  //     await apiClient.get("http://localhost:3001/users/")
  // }, [apiClient])


  // useEffect(() => {
  //     fetchData().then(() => {})
  // }, [fetchData])

  useEffect(() => {
      localStorage.setItem('theme', theme);
      document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const filteredData = filterdata(searchValue)
    setData(filteredData)
  }, [searchValue])

  return (
      <div className={`App ${theme}`}>
          <button onClick={toggleTheme}>Toggle Theme</button>
          <SearchBar callback={(searchValue) => setSearchValue(searchValue)}/>
          <Table userList={data}/>
      </div>
  );
}

export default App;