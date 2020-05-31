export const cartesianOfArrays = (a, b) =>
  [].concat(
    ...a.map((
      d // take each element from a
    ) =>
      b.map(
        (
          e // match that one element from a with every element from b
        ) => `${d}${e}` // concat the combination into a string
      )
    ) // concat all the combinations into one large array
  );
