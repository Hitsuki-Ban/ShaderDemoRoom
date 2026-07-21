const CUSTOM_PROPERTY_NAME = /^--[a-z0-9-]+$/;
const lastActualWriteByTarget = new WeakMap();

export function createStylePropertyWriter(target) {
  assertStyleTarget(target);

  let lastActualWriteByProperty = lastActualWriteByTarget.get(target);
  if (!lastActualWriteByProperty) {
    lastActualWriteByProperty = new Map();
    lastActualWriteByTarget.set(target, lastActualWriteByProperty);
  }

  return Object.freeze({
    set(propertyName, formattedValue) {
      assertPropertyName(propertyName);
      assertFormattedValue(formattedValue);

      const currentValue = readCurrentValue(target, propertyName);
      if (currentValue === formattedValue) {
        return false;
      }

      target.setProperty(propertyName, formattedValue);
      const actualValue = readCurrentValue(target, propertyName);
      lastActualWriteByProperty.set(propertyName, actualValue);

      if (actualValue !== formattedValue) {
        throw new Error(
          `CSS style target did not retain the exact value written for ${propertyName}.`,
        );
      }

      return true;
    },
  });
}

function assertStyleTarget(target) {
  const isObject = (typeof target === 'object' && target !== null)
    || typeof target === 'function';
  if (!isObject
    || typeof target.getPropertyValue !== 'function'
    || typeof target.setProperty !== 'function') {
    throw new TypeError(
      'CSS style target must provide getPropertyValue() and setProperty() methods.',
    );
  }
}

function assertPropertyName(propertyName) {
  if (typeof propertyName !== 'string' || !CUSTOM_PROPERTY_NAME.test(propertyName)) {
    throw new TypeError(
      'CSS custom property name must match /^--[a-z0-9-]+$/.',
    );
  }
}

function assertFormattedValue(formattedValue) {
  if (typeof formattedValue !== 'string') {
    throw new TypeError('CSS custom property value must be a formatted string.');
  }
}

function readCurrentValue(target, propertyName) {
  const currentValue = target.getPropertyValue(propertyName);
  if (typeof currentValue !== 'string') {
    throw new TypeError('CSS style target getPropertyValue() must return a string.');
  }
  return currentValue;
}
