import { useState } from 'react';
import {
    ICareFilter,
    ICareTypes,
    ICatalogItem,
} from '../../../types/catalogItem';
import deepCopyMap from '../../../utils/deepCopyMap';
import Checkbox from '../../UI/Checkbox/Checkbox';
import List from '../../UI/List';
import Modal from '../../UI/Modal/Modal';
import cl from './ItemEditModal.module.scss';

interface IItemEditModal {
    item: ICatalogItem;
    setIsRedacting: (value: React.SetStateAction<boolean>) => void;
    defaultCareFilters: Map<string, ICareFilter>;
    careFilterState: Map<string, ICareFilter>;
    setCareFilterState: (
        value: React.SetStateAction<Map<string, ICareFilter>>
    ) => void;
    saveChanges: (newCode: string, newItemProps: ICatalogItem) => void;
}

const ItemEditModal = ({
    item,
    setIsRedacting,
    defaultCareFilters,
    careFilterState,
    setCareFilterState,
    saveChanges,
}: IItemEditModal) => {
    const [newItemProps, setNewItemProps] = useState<ICatalogItem>({
        ...item,
        types: { ...item.types },
    });
    const [amountInput, setAmountInput] = useState(String(item.amount));
    const [priceIntInput, setPriceIntInput] = useState(
        String(Math.trunc(item.price))
    );
    const [priceDecInput, setPriceDecInput] = useState(
        String(item.price).split('.')[1] || '0'
    );
    const [codeInput, setCodeInput] = useState(item.code);

    const handleCodeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        let input = event.target.value;
        let regex = /^[A-Z0-9]+$/;
        if (regex.test(input)) {
            setCodeInput(input);
            setNewItemProps((prevProps) => {
                return { ...prevProps, code: input };
            });
        }
    };

    const reduceFilters = (careMap: Map<string, ICareFilter>) => {
        let newCareTypes: ICareTypes = {
            body: false,
            hands: false,
            legs: false,
            face: false,
            hair: false,
            suntan: false,
            shave: false,
            gift: false,
            hygiene: false,
            mouth: false,
            paper: false,
        };
        for (let [key, value] of careMap) {
            newCareTypes[key] = value.checked;
        }
        return newCareTypes;
    };

    const updateFilterFlags = (item: ICareFilter) => {
        let key = item.type;
        const careMap = deepCopyMap(careFilterState);
        let filter = careMap.get(key);
        if (filter) filter.checked = !filter.checked;
        setCareFilterState(careMap);
        setNewItemProps((prevProps) => {
            return { ...prevProps, types: reduceFilters(careMap) };
        });
    };

    const saveAmount = () => {
        setNewItemProps((prevProps) => {
            return {
                ...prevProps,
                amount: +amountInput,
            };
        });
    };

    const savePrice = () => {
        let newPrice = +priceIntInput + +(+priceDecInput / 100).toFixed(2);
        setNewItemProps((prevProps) => {
            return {
                ...prevProps,
                price: newPrice,
            };
        });
    };

    const cancelChanges = () => {
        setCareFilterState(defaultCareFilters);
        setCodeInput(item.code);
        setNewItemProps({ ...item, types: { ...item.types } });
        setAmountInput(String(item.amount));
        setPriceIntInput(String(Math.trunc(item.price)));
        setPriceDecInput(String(item.price).split('.')[1]);
        setIsRedacting(false);
    };

    const handlePositiveNumChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setInput: (value: React.SetStateAction<string>) => void
    ) => {
        let newInput = +event.target.value;
        if (newInput < 0) {
            setInput('0');
            return;
        } else if (newInput > 99999) {
            setInput('99999');
            return;
        }
        setInput(`${newInput}`);
    };

    return (
        <Modal onClick={cancelChanges}>
            <div className={cl.redactForm} onClick={(e) => e.stopPropagation()}>
                <label className={cl.name}>
                    Название:{' '}
                    <input
                        type="text"
                        value={newItemProps.name}
                        onChange={(e) =>
                            setNewItemProps((prevProps) => {
                                return {
                                    ...prevProps,
                                    name: e.target.value,
                                };
                            })
                        }
                    />
                </label>
                <label className={cl.unit}>
                    URL изображения:{' '}
                    <input
                        type="text"
                        value={newItemProps.img}
                        onChange={(e) =>
                            setNewItemProps((prevProps) => {
                                return {
                                    ...prevProps,
                                    img: e.target.value,
                                };
                            })
                        }
                    />
                </label>
                <label className={cl.unit}>
                    Единица измерения:{' '}
                    <input
                        type="text"
                        value={newItemProps.unit}
                        onChange={(e) =>
                            setNewItemProps((prevProps) => {
                                return {
                                    ...prevProps,
                                    unit: e.target.value,
                                };
                            })
                        }
                    />
                </label>
                <label className={cl.amount}>
                    Количество:{' '}
                    <input
                        type="number"
                        min={1}
                        max={99999}
                        value={amountInput}
                        onChange={(e) =>
                            handlePositiveNumChange(e, setAmountInput)
                        }
                        onBlur={saveAmount}
                    />
                </label>
                <label className={cl.code}>
                    Штрихкод:{' '}
                    <input
                        type="text"
                        value={codeInput}
                        onInput={handleCodeInput}
                    />
                </label>
                <label className={cl.mnfct}>
                    Производитель:{' '}
                    <input
                        type="text"
                        value={newItemProps.mnfct}
                        onChange={(e) =>
                            setNewItemProps((prevProps) => {
                                return {
                                    ...prevProps,
                                    mnfct: e.target.value,
                                };
                            })
                        }
                    />
                </label>
                <label className={cl.brand}>
                    Бренд:{' '}
                    <input
                        type="text"
                        value={newItemProps.brand}
                        onChange={(e) =>
                            setNewItemProps((prevProps) => {
                                return {
                                    ...prevProps,
                                    brand: e.target.value,
                                };
                            })
                        }
                    />
                </label>
                <label className={cl.descr}>
                    <span> Описание:</span>
                    <textarea
                        value={newItemProps.descr}
                        onChange={(e) =>
                            setNewItemProps((prevProps) => {
                                return {
                                    ...prevProps,
                                    descr: e.target.value,
                                };
                            })
                        }
                    />
                </label>
                <label className={cl.price}>
                    Цена:{' '}
                    <input
                        type="number"
                        value={priceIntInput}
                        onChange={(e) =>
                            handlePositiveNumChange(e, setPriceIntInput)
                        }
                        onBlur={savePrice}
                    />
                    .
                    <input
                        type="number"
                        maxLength={2}
                        value={priceDecInput}
                        onChange={(e) =>
                            handlePositiveNumChange(e, setPriceDecInput)
                        }
                        onBlur={savePrice}
                    />
                </label>
                <label>
                    <div className={cl.careTypes}>Типы ухода:</div>
                    <List
                        items={Array.from(careFilterState.values())}
                        renderItem={(item: ICareFilter) => {
                            return (
                                <Checkbox
                                    item={item}
                                    onChange={updateFilterFlags}
                                    checked={item.checked}
                                    key={item.type}
                                    className={cl.careTypes__item}
                                >
                                    {item.value}
                                </Checkbox>
                            );
                        }}
                        className={cl.careTypes}
                    />
                </label>
                <div className={cl.formControls}>
                    <button onClick={cancelChanges} className={cl.btn}>
                        Отменить
                    </button>
                    <button
                        onClick={() => saveChanges(codeInput, newItemProps)}
                        className={cl.btn}
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ItemEditModal;
