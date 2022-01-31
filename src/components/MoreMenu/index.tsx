import React, { FC, useState } from 'react';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { SvgIconComponent } from '@material-ui/icons';

export interface MoreMenuItems {
  [actionName: string]: {
    icon?: SvgIconComponent;
    handler?: () => void;
  };
}

interface MoreMenuProps {
  items: MoreMenuItems;
  color?: string;
}

const MoreMenu: FC<MoreMenuProps> = ({ items, color = 'rgba(0,0,0,1)' }) => {
  const [anchorElement, setAnchorElement] =
    useState<HTMLButtonElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorElement(e.currentTarget);
  };

  const handleClose = () => setAnchorElement(null);

  return (
    <>
      <IconButton
        aria-label="menu"
        aria-controls="simple-more-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color }}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        keepMounted
        id="simple-more-menu"
        anchorEl={anchorElement}
        open={!!anchorElement}
        onClose={handleClose}
      >
        {Object.keys(items).map((actionName: string, index: number) => {
          const {
            icon: ActionIcon,
            handler: actionHandler
          } = items[actionName];

          return (
            <MenuItem
              key={`${index}_${actionName}`}
              onClick={() => {
                handleClose();
                if (actionHandler) actionHandler();
              }}
            >
              {ActionIcon && (
                <ListItemIcon>
                  <ActionIcon />
                </ListItemIcon>
              )}
              <ListItemText>{actionName}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default MoreMenu;
