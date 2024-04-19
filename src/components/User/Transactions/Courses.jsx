import MaterialTable from 'material-table';
import moment from 'moment';

export default function Courses({ transactions }) {
  return (
    <div>
      <MaterialTable
        columns={[
          { title: 'S No', render: (rowData) => rowData.tableData.id + 1 },
          { title: 'Name', field: 'courseName' },
          { title: 'Package Name', field: 'packageName' },

          {
            title: 'Enrolment Date',
            render: (rowData) =>
              moment(new Date(rowData.enrollDate)).format('YYYY-MM-DD'),
          },
          {
            title: 'Expires on',
            render: (rowData) =>
              moment(new Date(rowData.expireDate)).format('YYYY-MM-DD'),
          },

          {
            title: 'Action',
            // render: (rowData) => console.log(rowData),
          },
        ]}
        data={transactions}
        title="Courses Transactions"
        options={{
          headerStyle: {
            textAlign: 'center',
            border: '2px solid white',
            width: 0,
            fontSize: '14px',
            whiteSpace: 'nowrap',
            flexDirection: 'row',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            backgroundColor: '#2d1f4c',
            color: 'white',
          },
          cellStyle: {
            textAlign: 'center',
            flexDirection: 'row',
            overflow: 'hidden',
            fontSize: '14px',
          },
          sorting: false,
          exportButton: false,
          exportAllData: false,
          debounceInterval: 700,
          padding: 'dense',
          showTitle: false,
        }}
      />
    </div>
  );
}
