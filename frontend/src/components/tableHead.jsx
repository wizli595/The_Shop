const TableHead = () => {
    return (<>
        <thead>
            <tr className='text-uppercase'>
                <th ><strong>id</strong></th>
                <th><strong>date</strong></th>
                <th><strong>total</strong></th>
                <th><strong>paid</strong></th>
                <th><strong>delivered</strong></th>
                <th></th>
            </tr>
        </thead>
    </>);
};

export default TableHead;