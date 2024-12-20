class AppConstant {
  // Ethereum adresi: wrap kontrat adresi
  static wrap = "0xA51894664A773981C6C112C43ce576f315d5b1B6";
  
  // API anahtarı
  static API = "6KCICCIVER24EKE5DNQ8HQDN5BAQSD19UD";
  
  // Maksimum gas limiti
  static maxGas = 500000;
  
  // Ritsuswap ETH to USDC kontrat adresi
  static ritsuswapETHtoUSDC = "0x7160570BB153Edd0Ea1775EC2b2Ac9b65F1aB61B";
  
  // Astraboost kontrat adresi
  static astraboost = "0x90CE48ED68C6FCAe6F13b445F1573f003cF1804d";
  
  // Minimum gas fiyatı (wei cinsinden)
  static minGasPrice = 0.12 * 1e9; // 0.12 Gwei
  
  // Maksimum gas fiyatı (wei cinsinden)
  static maxGasPrice = 0.17 * 1e9; // 0.17 Gwei
}

module.exports = AppConstant;
