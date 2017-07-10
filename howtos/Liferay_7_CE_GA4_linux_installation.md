# Liferay 7 CE GA4 on Linux: installation
1. __[Optional]__ Set up proxy in your _/etc/environment_
    ```
    http_proxy=http://my.proxy.com:1234/
    https_proxy=http://my.proxy.com:1234/
    HTTP_PROXY=http://my.proxy.com:1234/
    HTTPS_PROXY=http://my.proxy.com:1234/
    no_proxy=localhost,127.0.0.0/8,127.0.1.1,127.0.1.1*,local.home,.mydomain.com
    NO_PROXY=localhost,127.0.0.0/8,127.0.1.1,127.0.1.1*,local.home,.mydomain.com
    ```

2. Download the latest Java 8 JDK from [Oracle Website](http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html), decompress it and put it in _/opt/jdk_ with your normal user permissions
    ```
    tar -xzf jdk-8u131-linux-x64.tar.gz
    sudo mkdir /opt/jdk
    sudo chown user: /opt/jdk
    sudo mv -v jdk1.8.0_131/ /opt/jdk
    ```

3. Add the following lines to _~/.profile_
    ```
    export JAVA_HOME=/opt/jdk/jdk1.8.0_131
    export PATH=$JAVA_HOME/bin:$PATH
    ```

4. Install JPM, [Blade](https://github.com/liferay/liferay-blade-cli) and create a Liferay Workspace ([official guide](https://dev.liferay.com/develop/tutorials/-/knowledge_base/7-0/installing-blade-cli))
    * Download the latest [Liferay Workspace Installer](https://sourceforge.net/projects/lportal/files/Liferay%20Workspace/)
    * Change its permissions and run it
        ```
        chmod 744 LiferayWorkspace-1.2.4-linux-x64-installer.run
        ./LiferayWorkspace-1.2.4-linux-x64-installer.run
        ```
    * Follow the wizard to set up a new Liferay Workspace in the following dir
        ```
        ~/liferay/customer/project/liferay-workspace
        ```

5. __[Optional]__ Set up proxy in _liferay-workspace/gradle.properties_
    ```
    systemProp.http.proxyHost=my.proxy.com
    systemProp.http.proxyPort=1234
    systemProp.http.nonProxyHosts=localhost
    systemProp.https.proxyHost=my.proxy.com
    systemProp.https.proxyPort=1234
    systemProp.https.nonProxyHosts=localhost
    ```

6. Update Java Cryptography Extension, in order to download from https sourceforge ([issue here](https://web.liferay.com/community/forums/-/message_boards/view_message/85739563#_19_message_86861808))
    * Download [JCE](http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html)
    * Unzip it and overwrite policies
        ```
        unzip jce_policy-8.zip
        cd /opt/jdk/jdk1.8.0_131/jre/lib/security
        mv -v local_policy.jar local_policy.jar.orig
        mv -v US_export_policy.jar US_export_policy.jar.orig
        cd -
        cp -v UnlimitedJCEPolicyJDK8/local_policy.jar /opt/jdk/jdk1.8.0_131/jre/lib/security
        cp -v UnlimitedJCEPolicyJDK8/US_export_policy.jar /opt/jdk/jdk1.8.0_131/jre/lib/security
        ```

7. Add bundle variables in _liferay-workspace/gradle.properties_
    ```
    liferay.workspace.bundle.url=https://sourceforge.net/projects/lportal/files/Liferay\ Portal/7.0.3i\ GA4/liferay-ce-portal-tomcat-7.0-ga4-20170613175008905.zip
    liferay.workspace.home.dir=../liferay-ce-portal-7.0-ga4/
    ```

8. Initialize a Liferay 7 bundle
    ```
    cd liferay-workspace
    mkdir ../liferay-ce-portal-7.0-ga4
    ./gradlew initBundle
    ```

9. Install mysql-server >= 5.6.4
    ```
    sudo apt-get install mysql-server
    ```

10. Create a new database and a new user with privileges on it
    ```
    mysql -u root -p
    CREATE SCHEMA `test_db` DEFAULT CHARACTER SET utf8;
    CREATE USER 'test_usr'@'localhost' IDENTIFIED BY 'test_usr';
    GRANT ALL PRIVILEGES ON test_db.* TO 'test_usr'@'localhost';
    FLUSH PRIVILEGES;
    ```

11. Modify _liferay-ce-portal-7.0-ga4/portal-ext.properties_ with following content
    ```
    jdbc.default.driverClassName=com.mysql.jdbc.Driver
    jdbc.default.url=jdbc:mysql://localhost/test_db?useUnicode=true&characterEncoding=UTF-8&useFastDateParsing=false
    jdbc.default.username=test_usr
    jdbc.default.password=test_usr
    ```

12. __[Optional]__ Add proxy to _liferay-ce-portal-7.0-ga4/tomcat-8.0.32/bin/setenv.sh_
    ```
    CATALINA_OPTS="$CATALINA_OPTS -Dfile.encoding=UTF8 -Djava.net.preferIPv4Stack=true
    -Dorg.apache.catalina.loader.WebappClassLoader.ENABLE_CLEAR_REFERENCES=false
    -Duser.timezone=GMT -Dhttp.proxyHost=my.proxy.com -Dhttp.proxyPort=1234
    -Dhttps.proxyHost=my.proxy.com -Dhttps.proxyPort=1234 -Xmx1024m -XX:MaxPermSize=384m"
    ```

13. Create Tomcat logs directory
    ```
    mkdir ../liferay-ce-portal-7.0-ga4/tomcat-8.0.32/logs
    ```

14. Inside _liferay-workspace_ directory, let's start Tomcat in background and tail logs
    ```
    blade server start -b && tail -f ../liferay-ce-portal-7.0-ga4/tomcat-8.0.32/logs/catalina.out
    ```

15. With a browser go to _http://localhost:8080_ and follow the wizard to finalize portal installation

16. Exit from tail and restart the server
    ```
    <Ctrl-c>
    blade server stop
    blade server start -b && tail -f ../liferay-ce-portal-7.0-ga4/tomcat-8.0.32/logs/catalina.out
    ```

17. Go back to _http://localhost:8080_ and follow the wizard to your first time login
