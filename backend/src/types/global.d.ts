interface product {
  id: number;
  name: string;
  imgSrc: string;
  cost: number;
}

interface optionDetail {
  id: string;
  name: string;
  cost: number;
  stock: number;
}

interface options extends product {
  options: optionDetail[];
}
