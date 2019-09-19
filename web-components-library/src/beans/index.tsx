export type FooterBean = {
  zanichelliLinks: FooterGroupBean[];
  myzLink: MyzLinkBean;
  zanichelliAddress: string;
  social: FooterSocialBean[];
  certification: string;
  bottomLinks: FooterGroupItemBean[];
};

export type FooterGroupItemBean = {
  label: string;
  link: string;
  target?: string;
};

export type FooterGroupBean = {
  title: string;
  items: FooterGroupItemBean[];
};

export type MyzLinkBean = {
  label: string;
  img: string;
  link: string;
};

export type FooterSocialBean = {
  icon: string;
  link: string;
};

export type CardBean = {
  id: string;
  isbn: string;
  volume_title: string;
  opera_title: string;
  img: string;
  authors: string;
  year: number;
  actions: ActionBean[];
  is_bookmark: boolean;
};

export declare type ActionBean = {
  isLink: boolean;
  value: string;
  url?: string;
};

export type ListItemBean = {
  text: string;
  link?: string;
  icon?: string;
  listitemid?: string;
};

export type MenuDropdownItem = {
  text: string;
  link: string;
  linkid?: string;
  icon?: string;
};

export type FilterItem = {
  name: string;
  id: string;
  isActive: boolean;
  isfixed: boolean;
};

export type HeaderLink = {
  id: string;
  name: string;
  subMenu?: HeaderLink[];
  url?: string;
  icon?: string;
};

export type HeaderUserData = {
  islogged: boolean;
  id?: number;
  name?: string;
  usergroup: number;
  userlinks: MenuDropdownItem[];
};
export type ComboItemBean = {
  id: string;
  name: string;
  checked: boolean;
};

export type InputTypeBean = InputTypeEnum;

export enum InputTypeEnum {
  text = 'text',
  password = 'password',
  number = 'number',
  email = 'email'
}
