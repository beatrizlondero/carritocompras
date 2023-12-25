//PARA ORDENAR LOS PRODUCTOS POR RECIO 
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

const ProductSorting = ({ sortOrder, onSortChange }) => {
  const handleSortChange = (event) => {
    const newSortOrder = event.target.value;
    onSortChange(newSortOrder);
  };

  return (
    <div className="add-form">
      <h3>Que necesitas para estas 😍 Fiestas?</h3>
      <FormControl component="fieldset">
        <FormLabel
          component="legend"
          sx={{
            color: 'warning.main', 
            fontSize: '2rem',     
            
          }}
        >
          Orden de Precios
        </FormLabel>
        <RadioGroup
            row
            aria-label="Orden de Precios"
            name="sort-order"
            value={sortOrder || 'asc'}
            onChange={handleSortChange}
            sx={{
              color: 'warning.main', 
              fontSize: '1.5rem',
            }}
          >
            <FormControlLabel value="asc" control={<Radio />} label="Ascendente" />
            <FormControlLabel value="desc" control={<Radio />} label="Descendente" />
          </RadioGroup>
      </FormControl>
    </div>
  );
};

export default ProductSorting;





