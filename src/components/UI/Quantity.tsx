const Quantity = () => {

    
    return (
        <div className={cl.quantity}>
            <button className={cl.changeAmount} onClick={handleDecrementItem}>
                -
            </button>
            <label htmlFor='cart-quantity' className={cl.incart}>
                {editingQuantity ? (
                    <input
                        ref={quantityInputRef}
                        value={inputValue}
                        type='number'
                        name='cart-quantity'
                        id='cart-quantity'
                        onBlur={handleInputBlur}
                        onInput={handleInputChange}
                    />
                ) : (
                    <div onClick={handleInputFocus}>{itemInCart?.inCart || 0}</div>
                )}
            </label>
            <button className={cl.changeAmount} onClick={handleIncrementItem}>
                +
            </button>
        </div>
    );
};
