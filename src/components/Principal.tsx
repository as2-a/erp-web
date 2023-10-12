import { Card, CardContent, Divider, Typography, Grid, useMediaQuery, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {
    AccountBalance as BankIcon,
    Book as AccountingIcon,
    BusinessCenter as FixedAssetsIcon,
    AssignmentInd as AccountsPayableIcon,
    People as PayrollIcon,
    LocalShipping as LogisticsIcon,
} from '@mui/icons-material';
import AuthService from '../services/Auth.service';
import React from 'react';
import { environment } from '../environments/Dev.environment';

const Principal = () => {
    const navigate = useNavigate();
    if (!AuthService.isAuthenticated()) {
        React.useEffect(() => {
            navigate('/ferreteria/login');
        }, []);
    }

    const systems = [
        {
            name: 'Bancos',
            icon: <BankIcon fontSize="large" />,
            color: 'card-1',
            link: environment.banksUri,
        },
        {
            name: 'Contabilidad',
            icon: <AccountingIcon fontSize="large" />,
            color: 'card-2',
            link: '/ruta-contabilidad',
        },
        {
            name: 'Activos Fijos',
            icon: <FixedAssetsIcon fontSize="large" />,
            color: 'card-3',
            link: '/ruta-activos-fijos',
        },
        {
            name: 'Cuentas por Pagar',
            icon: <AccountsPayableIcon fontSize="large" />,
            color: 'card-4',
            link: '/ruta-cuentas-por-pagar',
        },
        {
            name: 'Nóminas',
            icon: <PayrollIcon fontSize="large" />,
            color: 'card-5',
            link: '/ruta-nominas',
        },
        {
            name: 'Logística de Compras',
            icon: <LogisticsIcon fontSize="large" />,
            color: 'card-6',
            link: '/ruta-logistica-compras',
        },
    ];

    const isSmallScreen = useMediaQuery('(max-width: 600px)');

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={'90vh'}
            marginTop={isSmallScreen ? '2rem' : ''}
            marginBottom={isSmallScreen ? '2rem' : ''}
        >
            <Grid container spacing={2}>
                {systems.map((system, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Link to={system.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Card
                                className={system.color}
                                style={{
                                    width: isSmallScreen ? '80%' : '90%',
                                    margin: '0 auto',
                                }}
                            >
                                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    {system.icon}
                                    <Divider style={{ margin: '12px 0' }} />
                                    <Typography variant="h6" align="center">
                                        {system.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Principal;
