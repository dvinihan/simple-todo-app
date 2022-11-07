import { Dialog, MenuItem } from "@mui/material";

type Props = {
  onClose: () => void;
  onSelect: (option: string) => void;
  open: boolean;
  options: string[];
};

export const PickerModal = ({ onClose, onSelect, open, options }: Props) => {
  return (
    <Dialog onClose={onClose} open={open}>
      {options.map((option) => (
        <MenuItem
          key="days-radio-button"
          onClick={() => onSelect(option)}
          value={option}
        >
          {option}
        </MenuItem>
      ))}
    </Dialog>
  );
};
