export function validateCpf(cpf: string) {
  const re = /\./gi;
  const formatted_cpf = cpf?.replace(re, '')?.replace('-', '')
  const first_nine_digits = formatted_cpf?.slice(0, 9)
  const last_two_digits = formatted_cpf?.slice(9, 11)

  const verificator_digits = calculateVerificatorDigits(first_nine_digits)

  return last_two_digits === verificator_digits
}

function calculateVerificatorDigits(cpf_code: string) {
  let valid_cpf = cpf_code
  let factorial = 10
  let sum = 0
  for (const number of valid_cpf) {
    const num = Number(number) * factorial
    sum += num
    factorial += -1
  }

  let mod_sum = sum % 11
  let dv1

  if (mod_sum < 2) {
    dv1 = 0
  } else {
    dv1 = 11 - mod_sum
  }

  valid_cpf += dv1
  factorial = 11
  sum = 0

  for (const number of valid_cpf) {
    const num = Number(number) * factorial
    sum += num
    factorial += -1
  }

  mod_sum = sum % 11
  let dv2

  if (mod_sum < 2) {
    dv2 = 0
  } else {
    dv2 = 11 - mod_sum
  }

  const verificator_digits = `${dv1}${dv2}`
  return verificator_digits
}