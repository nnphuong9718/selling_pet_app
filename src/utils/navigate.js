import React from 'react';

import emitter from './eventEmitter'

const popToRoot = () => {
    emitter.emit('RELOAD_CART', 10)
    this.props.popToTop();
}

export { popToRoot };