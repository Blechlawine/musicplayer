type TMakeOptional<Type> = {
    [Property in keyof Type]+?: Type[Property];
};
