export enum MainNavItem {
    SEARCH = 'search',
    DASHBOARD = 'dashboard',
    DOCUMENT = 'document',
    TAGS = 'tags'
};

export const MainNavItemPath: any = {
    [MainNavItem.SEARCH]: '/search',
    [MainNavItem.DASHBOARD]: '/dashboard',
    [MainNavItem.DOCUMENT]: '/document',
    [MainNavItem.TAGS]: '/tags'
};

export enum ComponentMode {
    VIEW = 'view',
    EDIT = 'edit'
};
