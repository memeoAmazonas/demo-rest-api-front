import React from 'react';
import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";

const SkeletoLoading = () => (
    <Container>
        <Skeleton variant="text" height={50} width="100%"/>
        <Skeleton variant="text" height={20} width="100%"/>
        <Skeleton variant="text" height={20} width="100%"/>
        <Skeleton variant="text" height={20} width="100%"/>
    </Container>
);

export default SkeletoLoading;
