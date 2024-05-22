import { INavbarData } from "./helper";

export const residentNavbarData: INavbarData[]  = [
    {

        routeLink : '/user-profile',
        icon: 'fa fa-user',
        label: 'User Profile',
        
    },
    {

        routeLink : '/home',
        icon: 'fa fa-home',
        label: 'Home',
    
    },
    {

        routeLink : '/maintenance',
        icon: 'fa fa-pencil',
        label: 'Maintenance',
        
    },
    {
        routeLink :'/water-meter',
        icon: 'fa fa-tint',
        label: 'Water Meter',
        items: [
            {
                routeLink : '/water-meter',
                label: 'Add Water Meter',
            },
            {
                routeLink : '/water-meter-list',
                label: 'Water Meter List',
            }
        ]
    },
    {
        routeLink : '/announcement',
        icon: 'fa fa-bullhorn',
        label: 'Announcement',
    }
        
];

export const adminNavbarData: INavbarData[]  = [
    {

        routeLink : '/user-profile',
        icon: 'fa fa-user',
        label: 'User Profile',
        
    },
    {
        routeLink : '/view-users',
        icon: 'fa fa-users',
        label: 'View Users',
    },
    {
        routeLink : '/view-blocks',
        icon: 'fa fa-building',
        label: 'View Blocks',
    },
    {
        routeLink :'/view-requests',
        icon: 'fa fa-tint',
        label: 'View Properties',
        items: [
            {
                routeLink : '/view-requests',
                label: 'View Requests',
            },
            {
                routeLink : '/view-apartaments',
                label: 'View Apartments',
            }
        ]
    },
    {

        routeLink : '/maintenance',
        icon: 'fa fa-pencil',
        label: 'Maintenance',
        
    },
    {
        routeLink : '/announcement',
        icon: 'fa fa-bullhorn',
        label: 'Announcement',
    }
        
];