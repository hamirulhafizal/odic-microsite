// project imports
import Specification from './Specification';
import Accordion from 'components/ui-component/extended/Accordion';

// accordion data
const descriptionData = [
  {
    id: 'basic1',
    defaultExpand: false,
    title: 'Specification',
    content: <Specification />
  }
];

// ==============================|| PRODUCT DETAILS - DESCRIPTION ||============================== //

const ProductDescription = (product) => <Accordion product={product} />;

export default ProductDescription;
