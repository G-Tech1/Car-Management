function ManufacturerList({manufacturers}) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>            
                {manufacturers.map(manufacturer => {
                    return (
                        <tr key={manufacturer.href}>
                            <td>{manufacturer.name}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default ManufacturerList;