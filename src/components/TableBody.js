import './tableBody.css'

export default function TableBody({ tableData, columns }) {
  return (
    <tbody>
     {tableData.map((data) => {
      return (
       <tr className='tableRowItems' key={data.id}>
        {columns.map(({ accessor }) => {
         const tData = data[accessor] ? data[accessor] : "-";
         return <td className='tableCell' key={accessor}>{tData}</td>
        })}
       </tr>
      );
     })}
    </tbody>
   );
}