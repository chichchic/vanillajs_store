interface optionDetail {
  id: string;
  name: string;
  cost: number;
  stock: number;
}

interface options {
  options: optionDetail[];
  id: number;
  name: string;
  imgSrc: string;
  cost: number;
}
