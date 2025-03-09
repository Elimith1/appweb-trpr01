export const validateName = (name: string): string | null => {
    if (!name) return "Le nom ne peut pas être vide.";
    return null;
  };
  
  export const validatePrice = (price: string): string | null => {
    if (!price) return "Le prix ne peut pas être vide.";
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber)) return "Le prix doit être un nombre valide."; // Stack OverFlow
    if (priceNumber <= 0) return "Le prix doit être supérieur à 0.";
    return null;
  };
  
  export const validateDescription = (description: string): string | null => {
    if (!description) return "La description est obligatoire.";
    return null;
  };
  
  export const validateWeight = (weight: string): string | null => {
    if (!weight) return "Le poids ne peut pas être vide.";
    const weightNumber = parseFloat(weight);
    if (isNaN(weightNumber)) return "Le poids doit être un nombre valide.";
    if (weightNumber <= 0) return "Le poids doit être supérieur à 0.";
    return null;
  };
  
  export const validateStock = (stock: string): string | null => {
    if (!stock) return "Le stock ne peut pas être vide.";
    const stockNumber = parseInt(stock);
    if (isNaN(stockNumber)) return "Le stock doit être un nombre valide.";
    if (stockNumber < 0) return "Le stock ne peut pas être négatif.";
    return null;
  };
  
  export const validateCategory = (category: string): string | null => {
    if (!category) return "La catégorie ne peut pas être vide.";
    return null;
  };