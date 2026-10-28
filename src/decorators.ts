
export function ValidateSpellPower(
  target: object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value as (
    ...args: unknown[]
  ) => unknown;

  descriptor.value = function (
    this: unknown,
    ...args: unknown[]
  ): unknown {
    const candidate: unknown = args[0];

    if (
      typeof candidate === "object" &&
      candidate !== null &&
      "power" in candidate &&
      typeof candidate.power === "number" &&
      candidate.power < 0
    ) {
      throw new Error("Spell power cannot be negative");
    }

    return originalMethod.apply(this, args);
  };
}


export function Cache(
  target: object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value as (
    ...args: unknown[]
  ) => unknown;

  const cache = new WeakMap<object, Map<string, unknown>>();

  descriptor.value = function (
    this: object,
    ...args: unknown[]
  ): unknown {
    let instanceCache = cache.get(this);

    if (!instanceCache) {
      instanceCache = new Map<string, unknown>();
      cache.set(this, instanceCache);
    }

    const key = JSON.stringify(args);

    if (instanceCache.has(key)) {
      console.log(`Résultat récupéré du cache : ${String(propertyKey)}`);
      return instanceCache.get(key);
    }

    const result = originalMethod.apply(this, args);
    instanceCache.set(key, result);

    return result;
  };
}