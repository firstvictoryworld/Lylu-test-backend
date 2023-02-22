export const generateInvoiceId = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '1234567890';

  let uuid = '';
  for (let i = 0; i < 2; i++) {
    const id = Math.floor(Math.random() * letters.length);
    uuid += letters[id];
  }
  for (let i = 0; i < 4; i++) {
    const id = Math.floor(Math.random() * digits.length);
    uuid += digits[id];
  }

  return uuid;
};
