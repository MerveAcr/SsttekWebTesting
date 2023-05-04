## Gerekli Programlar
 - otomasyon testlerini calistirmak icin gerekli olan programlari yuklediginize emin olun 
    - nodejs
    - npm
    - allure command line (zorunlu degil html report yerine allure kullanilmak isteniyorsa)
    - typescript
    - vscode

## Gerekli Adimlar
 - command promte, git bash editor , yada vscode terminal dan asagidaki kodlari calistirin, 
    - npm install -g typescript 
    - npm install -g allure-commandline --save-dev
    - npx playwright install
    - npm install

## Framework mimarisi
 - page object class lari ./src/pages klasorunu altinda bulunmaktadir
 - page ler mumkun oldugunca kucuk component lara bolunurse ileride bakim ve onarim daha kolay olucaktir
 - test ler lari ./src/tests klasorunu altinda bulunmaktadir.
 - ./utils klasorunun altina helper class lar olustrulabilir. Enum lar ile data lar kaydedilmistir.
 
## Test Calistirma
 - asagidaki kodlari calistirarak testleri calistirabilirsiniz
    - npm run test (test ler tarayicilarda acilir ve html report olusturulur);
    - npm run test:allure-report (testler headles tarayicilarda calisir tester calisan testleri gormez. Test sonunda allure report olusturulur ve browserda acilir)

## Test Report
- html report her calismadan sonra olusturulur ./playwright-report klasoru altina kaydedilir.
- allure report sadece npm run test:allure-report komutu ile calistirilan testlerden sonra olusturulur ve ./allure-results klasoru altinda saklanir. 

## Parallel Testing
- playright default olarak butun testleri paralel calistir. Eger bu degistirilmek istenirse playwright.config.ts configuration dosyasindan           "fullyParallel" degeri guncellenebilir. "workers" degeri guncellenerek istenilen kadar tarayicida ayni anda calismasi saglanabilir. By default     bilgisayarin CPU degerine gore ayarlanmis CPU su yuksek bilgisayarlarda 10 a kadar browser i ayni anda acabilmektedir. 

## Cross-browser Testing
- configuration dosyasi altinda "Project" degerinin icinde calistirablicek tarayicilar ve emulator lar eklenmistir. Playwright device listesinde 100 yakin farkli device i emulate edebilir testlerinizi calistirabilirsiniz. yeni bir device/browser eklemek gayet basittir, var olan bir project koplyanip, "Device" listesinden istenilen device in ismi girildiginde geri kalan configuration lari playwright otomaik olarak algiliyabilir. 

## Jenkins file
- Jenkins integrasyon surecinde sorun cikmasi halinda Jenkinsfile dosyasi altinda ki degelerler gozden gecirilmeli, docker image lerinin guncellenmesi gerekebilir.  

