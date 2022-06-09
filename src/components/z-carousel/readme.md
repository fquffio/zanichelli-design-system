# z-carousel



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute            | Description                                                                                                                               | Type      | Default     |
| -------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `ghostloadingheight` | `ghostloadingheight` | sets the height of z-carousel ghost loading, this prop is mandatory when isloading is set to true, as otherwise the component won't show. | `string`  | `"100"`     |
| `isloading`          | `isloading`          | sets whether the z-carousel is on loading state                                                                                           | `boolean` | `undefined` |


## Slots

| Slot | Description                                                                            |
| ---- | -------------------------------------------------------------------------------------- |
|      | carousel items. use `<li>` elements inside this slot as it is wrapped inside an `<ul>` |


## Dependencies

### Depends on

- [z-ghost-loading](../z-ghost-loading)

### Graph
```mermaid
graph TD;
  z-carousel --> z-ghost-loading
  style z-carousel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*