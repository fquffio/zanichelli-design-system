# z-toggle-switch



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type                                                                | Default                            |
| --------------- | ---------------- | ----------- | ------------------------------------------------------------------- | ---------------------------------- |
| `checked`       | `checked`        |             | `boolean`                                                           | `false`                            |
| `disabled`      | `disabled`       |             | `boolean`                                                           | `false`                            |
| `htmlid`        | `htmlid`         |             | `string`                                                            | ``toggle-switch-id-${randomId()}`` |
| `labelPosition` | `label-position` |             | `ZtoggleSwitchPositionEnum.left \| ZtoggleSwitchPositionEnum.right` | `ZtoggleSwitchPositionEnum.left`   |


## Events

| Event         | Description | Type               |
| ------------- | ----------- | ------------------ |
| `toggleClick` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [z-icon](../../icons/z-icon)

### Graph
```mermaid
graph TD;
  z-toggle-switch --> z-icon
  style z-toggle-switch fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*