# Taiko Transaction Bot

Bu Taiko da günlük olarak hacim botudur, rutin bir bottur, görevi 50 tane wrap ve 50 tane unwrap işlemi yapar ve bu işlemleri 5 saatlik rastgele bir zamanda yapar.


## Set Up

### Step-by-Step Instructions

1. **Update the package lists:**

   
    ```sh
    sudo apt-get update
    ```

2. **Install git:**

    ```sh
    sudo apt-get install git
    ```

3. **Clone the repository:**

    ```sh
    git clone https://github.com/KTasdemir33/TaikoBot.git
    ```

4. **Navigate to the project directory:**

    ```sh
    cd TaikoBot
    ```

5. **Install Node.js (if not already installed):**

    ```sh
    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    ```
    ```sh    
   sudo apt-get install -y nodejs
    ```

6. **Install the project dependencies:**

    ```sh
    npm install
    ```

7. **Create a `.env` file in the project directory and add your address & private key:**

    
    ```sh
    echo "PRIVATE_KEY=your_private_key_here" > .env
    ```

## Running the Bot

### One-time Run

To run the bot once:

```sh
npm run start
```
### Scheduled Run

Rastgele bir saat ve dakika oluşturma (08:00 ile 11:59 arasında çalışacak):

1.	Make the setup-cron.sh script executable:
 ```sh
sudo apt-get update
```
```sh
sudo apt-get install cron
```
```sh
sudo service cron start
```
```sh
sudo systemctl enable cron
```
```sh
chmod +x setup-cron.sh
```
2.	Run the setup-cron.sh script:
```sh
./setup-cron.sh
```
```sh
cat cron.log
```

## CONTRIBUTE

Feel free to fork and contribute adding more feature thanks.

## SUPPORT
Each tx contain tiny amount of tax to support next Bot with various features


