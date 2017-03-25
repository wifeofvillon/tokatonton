# ScoreSheet

This is a web application to support playing the event of "Great Writers and Alchemists", named "Gakumon no Susume".

## Description

- Logging the progress status of the game event with cookie.
- Previewing the progress status by cookie data.

## Requirement

- [Materialize ver.0.98.0](http://materializecss.com/)
- [Chart.js ver.2.5.0](http://www.chartjs.org/)
- [jQuery ver.2.1.1](https://jquery.com/)
- [jQuery.cookie ver.1.4.1](https://github.com/carhartl/jquery-cookie)

## Cookie Specification

|param  |value                        |
|:------|:----------------------------|
|key    |wovbunalsc                   |
|value  |(Described below)            |
|expires|Fri, 23 Mar 2018 02:30:30 GMT|

### Structure of cookie-value

```js
{
  "last": character.id,
  "character": [
    {
      "id": character.id,
      "score": number
    }
    ...
  ]
}
```

## Master Data Specification

|param    |value                 |
|:--------|:---------------------|
|character|Array(Described below)|
|graphfill|Array(Described below)|

### Structure of character-value

```js
[
  {
    "id": character.id,
    "name": character.name,
    "reward": [
      {
        "score": Number,
        "item": String
      },
      ...
    ]
  },
  ...
]
```
### Structure of graphfill-value

```js
[
  {
    "border": Number, // score border
    "color": String // color hex
  },
  ...
]
```

## Author

[@wifeofvillon](https://twitter.com/wifeofvillon)

## License

BSD
