import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Catalog from './components/Catalog/Catalog';

import './styles/main.scss';
import { useEffect, useState } from 'react';
import { IShopItem } from './types/shopItem';
import catalogJson from './catalog.json';

function App() {

  let catalogStr: string | null = JSON.stringify(catalogJson);
  localStorage.setItem('catalog', catalogStr);
  localStorage.setItem('catalogImgPath', 'src/assets/images/catalog/');
  catalogStr = localStorage.getItem('catalog');
  let catalogArr: IShopItem[] = [];
  if (catalogStr) {
    catalogArr = JSON.parse(catalogStr);
  }

  const [catalog, setCatalog] = useState<IShopItem[]>(catalogArr);

  return <div className='wrapper'>
    <Header />
    <Catalog catalog={catalog} />
    <Footer />
  </div>
}

export default App
