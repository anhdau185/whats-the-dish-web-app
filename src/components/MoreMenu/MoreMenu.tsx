import React, { FC, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

type ItemClickHandler = () => any;

export interface MoreMenuItems {
  [itemName: string]: ItemClickHandler;
}

interface MoreMenuProps {
  items: MoreMenuItems;
  color?: string;
}

const MoreMenu: FC<MoreMenuProps> = ({ items, color = 'rgba(0, 0, 0, 1)' }) => {
  const [anchorElement, setAnchorElement] =
    useState<HTMLButtonElement | null>(null);

  const handleClick =
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
      setAnchorElement(e.currentTarget);

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
        {Object.keys(items).map(
          (itemName: string, index: number) => {
            const itemClickHandler: ItemClickHandler = items[itemName];
            return (
              <MenuItem
                key={`${index}_${itemName}`}
                onClick={() => {
                  handleClose();
                  itemClickHandler();
                }}
              >
                {itemName}
              </MenuItem>
            );
          }
        )}
      </Menu>
    </>
  );
};

export default MoreMenu;
