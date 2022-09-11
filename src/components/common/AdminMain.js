import React from 'react';
import PageContainer from './PageContainer'

const AdminMain = (props) => {
    return (
        <main>
        <PageContainer  clicked={props.clicked}></PageContainer>
        </main>
    );
};

export default AdminMain;