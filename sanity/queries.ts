export const menuQuery = `
  *[_type == "menuCategory"] | order(order asc) {
    _id,
    title,
    order,
    items[] {
      name,
      price,
      small,
      large,
      unit
    },
    notes
  }
`;
