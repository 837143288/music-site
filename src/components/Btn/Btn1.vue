<template>
  <div>
    <h1>Bunch-o-Buttons</h1>
    <div class="grid">
      <div class="grid-item">
        <div class="presentation-block">
          <div class="title">Default</div>
          <div class="row">
            <button class="btn btn-default">Normal</button>
            <button class="btn btn-default focus">Hover</button>
            <button class="btn btn-default active">Active</button>
            <button class="btn btn-default" disabled>Disabled</button>
          </div>
          <div class="title">Default - Flat</div>
          <div class="row">
            <button class="btn btn-default btn-flat">Normal</button>
            <button class="btn btn-default btn-flat focus">Hover</button>
            <button class="btn btn-default btn-flat active">Active</button>
            <button class="btn btn-default btn-flat" disabled>Disabled</button>
          </div>
        </div>
      </div>
      <div class="grid-item">
        <div class="presentation-block">
          <div class="title">Primary</div>
          <div class="row">
            <button class="btn btn-primary">Normal</button>
            <button class="btn btn-primary focus">Hover</button>
            <button class="btn btn-primary active">Active</button>
            <button class="btn btn-primary" disabled>Disabled</button>
          </div>
          <div class="title">Primary - Flat</div>
          <div class="row">
            <button class="btn btn-primary btn-flat">Normal</button>
            <button class="btn btn-primary btn-flat focus">Hover</button>
            <button class="btn btn-primary btn-flat active">Active</button>
            <button class="btn btn-primary btn-flat" disabled>Disabled</button>
          </div>
        </div>
      </div>
      <div class="grid-item">
        <div class="presentation-block">
          <div class="title">Success</div>
          <div class="row">
            <button class="btn btn-success">Normal</button>
            <button class="btn btn-success focus">Hover</button>
            <button class="btn btn-success active">Active</button>
            <button class="btn btn-success" disabled>Disabled</button>
          </div>
          <div class="title">Success - Flat</div>
          <div class="row">
            <button class="btn btn-success btn-flat">Normal</button>
            <button class="btn btn-success btn-flat focus">Hover</button>
            <button class="btn btn-success btn-flat active">Active</button>
            <button class="btn btn-success btn-flat" disabled>Disabled</button>
          </div>
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="grid-item">
        <div class="presentation-block">
          <div class="title">Info</div>
          <div class="row">
            <button class="btn btn-info">Normal</button>
            <button class="btn btn-info focus">Hover</button>
            <button class="btn btn-info active">Active</button>
            <button class="btn btn-info" disabled>Disabled</button>
          </div>
          <div class="title">Info - Flat</div>
          <div class="row">
            <button class="btn btn-info btn-flat">Normal</button>
            <button class="btn btn-info btn-flat focus">Hover</button>
            <button class="btn btn-info btn-flat active">Active</button>
            <button class="btn btn-info btn-flat" disabled>Disabled</button>
          </div>
        </div>
      </div>

      <div class="grid-item">
        <div class="presentation-block">
          <div class="title">Warning</div>
          <div class="row">
            <button class="btn btn-warning">Normal</button>
            <button class="btn btn-warning focus">Hover</button>
            <button class="btn btn-warning active">Active</button>
            <button class="btn btn-warning" disabled>Disabled</button>
          </div>
          <div class="title">Warning - Flat</div>
          <div class="row">
            <button class="btn btn-warning btn-flat">Normal</button>
            <button class="btn btn-warning btn-flat focus">Hover</button>
            <button class="btn btn-warning btn-flat active">Active</button>
            <button class="btn btn-warning btn-flat" disabled>Disabled</button>
          </div>
        </div>
      </div>

      <div class="grid-item">
        <div class="presentation-block">
          <div class="title">Danger</div>
          <div class="row">
            <button class="btn btn-danger">Normal</button>
            <button class="btn btn-danger focus">Hover</button>
            <button class="btn btn-danger active">Active</button>
            <button class="btn btn-danger" disabled>Disabled</button>
          </div>
          <div class="title">Danger - Flat</div>
          <div class="row">
            <button class="btn btn-danger btn-flat">Normal</button>
            <button class="btn btn-danger btn-flat focus">Hover</button>
            <button class="btn btn-danger btn-flat active">Active</button>
            <button class="btn btn-danger btn-flat" disabled>Disabled</button>
          </div>
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="grid-item">&nbsp;</div>
      <div class="grid-item">
        <div class="presentation-block">
          <div class="title">Size Variants</div>
          <div class="row">
            <button class="btn btn-default btn-xs">Extra Small</button>
            <button class="btn btn-default btn-sm">Small</button>
            <button class="btn btn-default">Normal</button>
            <button class="btn btn-default btn-lg">Large</button>
          </div>
          <div class="title">Size Variants - Flat</div>
          <div class="row">
            <button class="btn btn-default btn-flat btn-xs">Extra Small</button>
            <button class="btn btn-default btn-flat btn-sm">Small</button>
            <button class="btn btn-default btn-flat">Normal</button>
            <button class="btn btn-default btn-flat btn-lg">Large</button>
          </div>
        </div>
      </div>
      <div class="grid-item">&nbsp;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Btn1",
};
</script>

<style lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Roboto", sans-serif;
  font-size: 1.6rem;
  padding: 20px 80px;
  background-color: #eee;
}

h1 {
  text-align: center;
  font-size: 4rem;
  font-weight: 100;
  margin-top: 0;
  margin-bottom: 20px;
  color: #aaa;
}

.grid {
  margin-left: -10px;
  margin-right: -10px;

  &:before,
  &:after {
    content: " ";
    display: table;
  }

  &:after {
    clear: both;
  }
}

.grid-item {
  width: percentage(1/3);
  float: left;
  padding-left: 10px;
  padding-right: 10px;
}

.presentation-block {
  text-align: center;
  padding: 10px;
  border-radius: 3px;
  margin-bottom: 10px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.075);

  .title {
    display: block;
    text-transform: uppercase;
    font-size: 1.4rem;
    color: #aaa;
    margin-bottom: 10px;
  }

  .row {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.btn {
  display: inline-block;
  margin-bottom: 0;
  text-align: center;
  text-transform: uppercase;
  vertical-align: middle;
  cursor: pointer;
  background-image: none;
  whitespace: nowrap;
  padding: 6px 12px;
  font-size: 1.4rem;
  border-radius: 3px;
  border: 1px solid transparent;
  text-decoration: none;
  user-select: none;

  &,
  &:active,
  &.active {
    &:focus {
      outline: thin dotted;
      outline: 5px auto -webkit-focus-ring-color;
      outline-offset: -2px;
    }
  }

  &:hover,
  &:focus,
  &.focus {
    text-decoration: none;
    color: #fff;
  }

  &:active,
  &.active {
    outline: 0;
    background-image: none;
  }

  &.disabled,
  &[disabled],
  fieldset[disabled] & {
    cursor: not-allowed;
    pointer-events: none;
    box-shadow: none;
  }

  &.btn-xs {
    padding: 3px 6px;
    font-size: 1.2rem;
  }

  &.btn-sm {
    padding: 4px 8px;
    font-size: 1.3rem;
  }

  &.btn-lg {
    padding: 8px 16px;
    font-size: 1.6rem;
  }
}

@mixin btn-variant(
  $border,
  $from,
  $to,
  $gloss,
  $color,
  $hover-from,
  $active-border
) {
  color: $color;
  border-color: $border;
  background: linear-gradient(to bottom, $from 0%, $to 100%);
  box-shadow: inset 0 1px $gloss, 0 1px 2px rgba(0, 0, 0, 0.2);

  &:hover,
  &:focus,
  &.focus {
    border-color: $to;
    background: linear-gradient(to bottom, $hover-from 0%, $from 100%);
    box-shadow: inset 0 1px $color, 0 2px 3px rgba(0, 0, 0, 0.2);
  }

  &:active,
  &.active {
    border-color: $active-border;
    color: $gloss;
    background: linear-gradient(to bottom, $to 0%, $border 100%);
    box-shadow: inset 0 2px 2px $active-border;
  }

  &.disabled,
  &[disabled],
  fieldset[disabled] & {
    background: $hover-from;
    border-color: $from;
  }
}

@mixin btn-flat($active, $hover, $normal, $active-color, $color, $disabled) {
  color: $color;
  border-color: transparent;
  background: $normal;
  box-shadow: none;

  &:hover,
  &:focus,
  &.focus {
    border-color: transparent;
    color: #fff;
    background: $hover;
    box-shadow: none;
  }

  &:active,
  &.active {
    border-color: $active;
    color: $active-color;
    background: $active;
    box-shadow: none;
  }

  &.disabled,
  &[disabled],
  fieldset[disabled] & {
    background: $disabled;
    border-color: $disabled;
  }
}

.btn-default {
  @include btn-variant(
    #546e7a,
    #90a4ae,
    #78909c,
    #cfd8dc,
    #eceff1,
    #b0bec5,
    #455a64
  );

  &.btn-flat {
    @include btn-flat(#546e7a, #90a4ae, #78909c, #cfd8dc, #eceff1, #b0bec5);
  }
}

.btn-primary {
  @include btn-variant(
    #1e88e5,
    #64b5f6,
    #42a5f5,
    #bbdefb,
    #e3f2fd,
    #90caf9,
    #1976d2
  );

  &.btn-flat {
    @include btn-flat(#1e88e5, #64b5f6, #42a5f5, #bbdefb, #e3f2fd, #90caf9);
  }
}

.btn-success {
  @include btn-variant(
    #43a047,
    #81c784,
    #66bb6a,
    #c8e6c9,
    #e8f5e9,
    #a5d6a7,
    #388e3c
  );

  &.btn-flat {
    @include btn-flat(#43a047, #81c784, #66bb6a, #c8e6c9, #e8f5e9, #a5d6a7);
  }
}

.btn-info {
  @include btn-variant(
    #00acc1,
    #4dd0e1,
    #26c6da,
    #b2ebf2,
    #e0f7fa,
    #80deea,
    #0097a7
  );

  &.btn-flat {
    @include btn-flat(#00acc1, #4dd0e1, #26c6da, #b2ebf2, #e0f7fa, #80deea);
  }
}

.btn-warning {
  @include btn-variant(
    #fb8c00,
    #ffb74d,
    #ffa726,
    #ffe0b2,
    #fff3e0,
    #ffcc80,
    #f57c00
  );

  &.btn-flat {
    @include btn-flat(#fb8c00, #ffb74d, #ffa726, #ffe0b2, #fff3e0, #ffcc80);
  }
}

.btn-danger {
  @include btn-variant(
    #f4511e,
    #ff8a65,
    #ff7043,
    #ffccbc,
    #fbe9e7,
    #ffab91,
    #e64a19
  );

  &.btn-flat {
    @include btn-flat(#f4511e, #ff8a65, #ff7043, #ffccbc, #fbe9e7, #ffab91);
  }
}
</style>