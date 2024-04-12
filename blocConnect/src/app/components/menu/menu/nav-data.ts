import { INavbarData } from "./helper";

export const navbarData: INavbarData[]  = [
    {

        routeLink : '/user-profile',
        icon: 'fa fa-user',
        label: 'User Profile',
        
    },
    {

        routeLink : '/home',
        icon: 'fal fa-home',
        label: 'Home',
    
    },
    {

        routeLink : '/maintenance',
        icon: 'maintenance',
        label: 'maintenance',
        
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